/**
 * Geographic math: turn latitude/longitude into a point on the globe.
 *
 * The mapping matches the equirectangular earth texture convention used in
 * three.js, so `latLngToVector3(0, 0, R)` sits on the texture's centre meridian
 * (0deg longitude) and latitude 0.
 */
import * as THREE from 'three'
import { GLOBE_TUNING } from './theme.js'

export const DEG = Math.PI / 180
export const RAD = 180 / Math.PI

/** Convert latitude/longitude (degrees) into a world-space Vector3. */
export function latLngToVector3(lat, lng, radius = GLOBE_TUNING.radius) {
  const phi = (90 - lat) * DEG
  const theta = (lng + 180) * DEG
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

/** Outward surface normal at a lat/lng. */
export function latLngToNormal(lat, lng) {
  return latLngToVector3(lat, lng, 1).normalize()
}

/**
 * A quaternion that rotates local +Y onto the surface normal, so a model authored
 * standing up on y = 0 ends up standing on the globe surface.
 */
export function surfaceQuaternion(lat, lng) {
  const normal = latLngToNormal(lat, lng)
  return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal)
}

/** Great-circle points between two coordinates - used for the border arc. */
export function greatCirclePoints(from, to, segments = 64, radius = GLOBE_TUNING.radius) {
  const a = latLngToVector3(from.lat, from.lng, radius)
  const b = latLngToVector3(to.lat, to.lng, radius)
  const points = []
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments
    const v = new THREE.Vector3().copy(a).lerp(b, t)
    // Slerp-style lift keeps the arc hugging the sphere instead of cutting through it.
    v.setLength(radius)
    points.push(v)
  }
  return points
}

/** Angular distance in degrees between two coordinates. */
export function angularDistance(a, b) {
  const v1 = latLngToNormal(a.lat, a.lng)
  const v2 = latLngToNormal(b.lat, b.lng)
  return Math.acos(THREE.MathUtils.clamp(v1.dot(v2), -1, 1)) * RAD
}

/** Normalise an angle to (-180, 180]. */
export const wrapLongitude = (lng) => ((((lng + 180) % 360) + 360) % 360) - 180
