export interface Subtitle {
  lines: Line[]
}

export interface Line {
  start: number // start time in milliseconds
  end: number // end time in milliseconds
  text: string
}

/**
 * Parses an SRT (SubRip Subtitle) formatted string into a Subtitle object.
 * @param srt - The SRT content as a string.
 * @returns A Subtitle object.
 */
export function parseSRT(srt: string): Subtitle {
  const lines: Line[] = []

  const blocks = srt
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())

  for (const block of blocks) {
    const parts = block.split('\n')
    if (parts.length < 3) continue

    const timeRegex = /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/
    const match = parts[1].match(timeRegex)
    if (!match) continue

    const start =
      parseInt(match[1]) * 3600000 +
      parseInt(match[2]) * 60000 +
      parseInt(match[3]) * 1000 +
      parseInt(match[4])
    const end =
      parseInt(match[5]) * 3600000 +
      parseInt(match[6]) * 60000 +
      parseInt(match[7]) * 1000 +
      parseInt(match[8])

    const text = parts.slice(2).join('\n')

    lines.push({ start, end, text })
  }

  return { lines }
}
