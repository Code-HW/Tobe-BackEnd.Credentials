declare var module: NodeModule & {
  hot?: {
    accept(dependency?: string, callback?: () => void): void
    dispose(callback: (data: unknown) => void): void
  }
}
