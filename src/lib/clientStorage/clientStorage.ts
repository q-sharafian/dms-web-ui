import { LSFieldKey, UserPreferences } from "@/interfaces/clientStorageData"
import { logger } from "@/lib/logger/logger"
import { isRunOnServer } from "../utils"

export class ClientStorage {
  /**
 * Get an item of user preferences.  
 * If there's not such key, return null.  
 * The operation just run on client-side. If run on server-side, return null.
 * @throws Error
 */
  static getUPItem = <K extends LSFieldKey>(
    key: K
  ): UserPreferences[K] => {
    if (isRunOnServer()) return null
    const item = localStorage.getItem(key)
    try {
      return item ? JSON.parse(item) : null
    } catch (error) {
      throw Error(`error reading item "${key}" from localStorage: ${error}`)
    }
  }

  /**
   * Set an item of user preferences.  
   * If the input value be null, delete the key-value if exists.
   * The operation just run on client-side. If run on server-side, do nothing.
   */
  static setUPItem = <K extends LSFieldKey>(
    key: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ): void => {
    if (isRunOnServer()) return
    if (value == null) {
      localStorage.removeItem(key)
      logger.debug(`Removed key ${key}: because its value is null`);
      return
    }

    const stringValue = JSON.stringify(value)
    localStorage.setItem(key, stringValue)
  }
}
