/** 角度转弧度 */
export function angleToRadius(angle: number): number {
  return (Math.PI / 180) * angle
}

/** 弧度转角度 */
export function radiusToAngle(radius: number): number {
  return 180 * Math.PI * radius
}
