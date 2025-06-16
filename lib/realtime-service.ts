// Simulated real-time service using localStorage and events
class RealtimeService {
  private listeners: Map<string, Function[]> = new Map()

  subscribe(channel: string, callback: Function) {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, [])
    }
    this.listeners.get(channel)?.push(callback)

    // Listen for storage changes (simulates real-time updates)
    const storageListener = (e: StorageEvent) => {
      if (e.key === channel && e.newValue) {
        callback(JSON.parse(e.newValue))
      }
    }
    window.addEventListener("storage", storageListener)

    return () => {
      const callbacks = this.listeners.get(channel)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
      window.removeEventListener("storage", storageListener)
    }
  }

  publish(channel: string, data: any) {
    localStorage.setItem(channel, JSON.stringify(data))

    // Notify local listeners
    const callbacks = this.listeners.get(channel)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }

    // Trigger storage event for other tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: channel,
        newValue: JSON.stringify(data),
      }),
    )
  }

  getStoredData(channel: string) {
    const data = localStorage.getItem(channel)
    return data ? JSON.parse(data) : null
  }
}

export const realtimeService = new RealtimeService()
