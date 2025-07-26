export class Terminal {
  // state
  private root = new Directory('root')
  private currentDirectory: Directory

  constructor() {
    this.currentDirectory = this.root
    // Setup initial file system from the story
    const gardens = new Directory('The_Gardens_of_Memory')
    const hall = new Directory('The_Great_Hall')
    const tower = new Directory('The_Lonely_Tower')
    const zero = new File('zero', '...哇！终于有人来了！我想要的《罗小黑战记》你带来了吗？')

    this.root.add(gardens)
    this.root.add(hall)
    this.root.add(tower)
    this.root.add(zero)
  }

  public getCurrentDirectory(): Directory {
    return this.currentDirectory
  }

  public setCurrentDirectory(dir: Directory) {
    this.currentDirectory = dir
  }

  public getRootDirectory(): Directory {
    return this.root
  }
}

export class File {
  private content: string
  public readonly name: string

  constructor(name: string, content: string = '') {
    this.name = name
    this.content = content
  }

  read(): string {
    return this.content
  }

  write(content: string): void {
    this.content = content
  }
}

export class Directory {
  private children: Record<string, File | Directory>
  public readonly name: string

  constructor(name: string) {
    this.name = name
    this.children = {}
  }

  list(): string[] {
    return Object.keys(this.children)
  }

  get(name: string): File | Directory | undefined {
    return this.children[name]
  }

  add(item: File | Directory) {
    this.children[item.name] = item
  }

  remove(name: string) {
    delete this.children[name]
  }
}

export interface CommandContext {
  terminal: Terminal
  args: string[]
}

export interface Command {
  name: string
  execute(context: CommandContext): string
}

type Args = Record<string, string | number | boolean>

export class Cd implements Command {
  name = 'cd'
  execute({ terminal, args }: CommandContext): string {
    const targetName = args[0]
    if (!targetName) {
      return 'usage: cd <directory>'
    }

    if (targetName === '..') {
      // This is a simplified version, doesn't handle nested paths
      terminal.setCurrentDirectory(terminal.getRootDirectory())
      return ''
    }

    const target = terminal.getCurrentDirectory().get(targetName)
    if (target && target instanceof Directory) {
      terminal.setCurrentDirectory(target)
      return ''
    } else {
      return `cd: no such file or directory: ${targetName}`
    }
  }
}

export class Ls implements Command {
  name = 'ls'
  execute({ terminal, args }: CommandContext): string {
    if (args[0] === '-l') {
      // This is hardcoded to match the story's output
      return `drwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Gardens_of_Memory/<br/>drwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Great_Hall/<br/>drwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Lonely_Tower/<br/>-rwxr-xr-x 1 zero users 1.2P Jul 24 11:30 zero*`
    }
    return terminal.getCurrentDirectory().list().join('  ')
  }
}

export class Cat implements Command {
  name = 'cat'

  execute({ terminal, args }: CommandContext): string {
    const fileName = args[0]
    if (!fileName) {
      return 'usage: cat <file>'
    }
    const file = terminal.getCurrentDirectory().get(fileName)
    if (file && file instanceof File) {
      return file.read()
    } else {
      return `cat: ${fileName}: No such file or directory`
    }
  }
}

export class Touch implements Command {
  name = 'touch'

  execute({ terminal, args }: CommandContext): string {
    const fileName = args[0]
    if (!fileName) {
      return 'usage: touch <file>'
    }
    terminal.getCurrentDirectory().add(new File(fileName))
    return ''
  }
}

export class Mkdir implements Command {
  name = 'mkdir'

  execute({ terminal, args }: CommandContext): string {
    const dirName = args[0]
    if (!dirName) {
      return 'usage: mkdir <directory>'
    }
    terminal.getCurrentDirectory().add(new Directory(dirName))
    return ''
  }
}

export class Rm implements Command {
  name = 'rm'

  execute({ terminal, args }: CommandContext): string {
    const name = args[0]
    if (!name) {
      return 'usage: rm <file_or_directory>'
    }
    terminal.getCurrentDirectory().remove(name)
    return ''
  }
}

// Patient Zero AI (boss)
export class Zero implements Command {
  name = 'zero'
  execute(context: CommandContext): string {
    // The complex dialog logic will be handled in the UI component
    // This is just a placeholder
    return 'Executing zero...'
  }
}
