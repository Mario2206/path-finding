import {MapPoint} from "./distance.calculator.types";

export class DistanceCalculator {
  private _distance : number = 0

  constructor(
    private pointA : MapPoint,
    private pointB : MapPoint
  ) {
  }

  computeDistance() {
    const lat1 = this.pointA.lat / (180 / Math.PI)
    const lat2 = this.pointB.lat / (180 / Math.PI)
    const lng1 = this.pointA.lng / (180 / Math.PI)
    const lng2 = this.pointB.lng / (180 / Math.PI)

    this._distance = 6371 * Math.acos( (Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)) )
  }

  computeDuration(speedInKmH: number) {
    const durationInHours = this._distance / speedInKmH
    return durationInHours * 60 * 60 * 1000
  }

  get distance() {
    return this._distance
  }
}
