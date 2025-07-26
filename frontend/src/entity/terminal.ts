export class Terminal {
  // state
  private root = new Directory()
  constructor() {}
}

class File {
  private content: string

  constructor(content: string = '') {
    this.content = content
  }

  read(): string {
    return this.content
  }

  write(content: string): void {
    this.content = content
  }
}

class Directory {
  private children: Record<string, File | Directory>

  constructor() {
    this.children = {}
  }
}

interface Command {
  name: string
  execute(args: Args): string
}

type Args = Record<string, string | number | boolean>

class Cd implements Command {
  name = 'cd'
  execute(args: Args): string {
    return ''
  }
}

class Ls implements Command {
  name = 'ls'
  execute(args: Args): string {
    return ''
  }
}

class Cat implements Command {
  name = 'cat'

  execute(file: File): string {
    return file.read()
  }
}

class Touch implements Command {
  name = 'touch'

  execute(directory: Directory, fileName: string): void {
    directory[fileName] = new File()
  }
}

class Mkdir implements Command {
  name = 'mkdir'

  execute(directory: Directory, dirName: string): void {
    directory[dirName] = new Directory()
  }
}

class Rm implements Command {
  name = 'rm'

  execute(directory: Directory, name: string): void {
    delete directory[name]
  }
}

// Patient Zero AI (boss)
class Zero implements Command {
  name = 'zero'
  execute(args: Args): string {
    return ''
  }
}

class FileSystem {
  private files: Directory

  constructor() {
    this.files = new Directory()
  }
}
