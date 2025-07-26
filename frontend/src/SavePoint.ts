interface SavePoint {
  id: string
  url: string
}

export default class SavePointManager {
  private savePoints: SavePoint[] = []

  go(id: string, url: string): void {
    this.savePoints.push({ id, url })
  }
}
