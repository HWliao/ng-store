declare namespace Reflect {
  /**
   * Define a unique metadata entry on the target.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param metadataValue A value that contains attached metadata.
   * @param target The target object on which to define metadata.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  Reflect.defineMetadata("custom:annotation", options, Example);
   *
   *  // decorator factory as metadata-producing annotation.
   *  function MyAnnotation(options): ClassDecorator {
   *      return target => Reflect.defineMetadata("custom:annotation", options, target);
   *  }
   * ```
   */
  function defineMetadata(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol): void;
  /**
   * Deletes the metadata entry from the target object with the provided key.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param target The target object on which the metadata is defined.
   * @returns `true` if the metadata entry was found and deleted; otherwise, false.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.deleteMetadata("custom:annotation", Example);
   * ```
   */
  function deleteMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
  /**
   * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param target The target object on which the metadata is defined.
   * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.getMetadata("custom:annotation", Example);
   * ```
   */
  function getMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): any;
  /**
   * Gets the metadata keys defined on the target object or its prototype chain.
   * @param target The target object on which the metadata is defined.
   * @returns An array of unique metadata keys.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.getMetadataKeys(Example);
   * ```
   */
  function getMetadataKeys(target: Object, targetKey?: string | symbol): any[];
  /**
   * Gets the metadata value for the provided metadata key on the target object.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param target The target object on which the metadata is defined.
   * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.getOwnMetadata("custom:annotation", Example);
   * ```
   */
  function getOwnMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): any;

  /**
   * Gets the unique metadata keys defined on the target object.
   * @param target The target object on which the metadata is defined.
   * @returns An array of unique metadata keys.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.getOwnMetadataKeys(Example);
   * ```
   */
  function getOwnMetadataKeys(target: Object, targetKey?: string | symbol): any[];
  /**
   * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param target The target object on which the metadata is defined.
   * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.hasMetadata("custom:annotation", Example);
   * ```
   */
  function hasMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
  /**
   * Gets a value indicating whether the target object has the provided metadata key defined.
   * @param metadataKey A key used to store and retrieve metadata.
   * @param target The target object on which the metadata is defined.
   * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *
   *  class Example {
   *  }
   *
   *  // constructor
   *  result = Reflect.hasOwnMetadata("custom:annotation", Example);
   * ```
   */
  function hasOwnMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
  /**
   * A default metadata decorator factory that can be used on a class, class member, or parameter.
   * @param metadataKey The key for the metadata entry.
   * @param metadataValue The value for the metadata entry.
   * @returns A decorator function.
   * @remarks
   * If `metadataKey` is already defined for the target and target key, the
   * metadataValue for that key will be overwritten.
   * @example
   *
   * ### Example
   *
   * ```typescript
   *  // constructor
   *  @Reflect.metadata(key, value)
   *  class Example {
   *  }
   *
   *  // property (on constructor, TypeScript only)
   *  class Example {
   *      @Reflect.metadata(key, value)
   *      static staticProperty;
   *  }
   *
   *  // property (on prototype, TypeScript only)
   *  class Example {
   *      @Reflect.metadata(key, value)
   *      property;
   *  }
   *
   *  // method (on constructor)
   *  class Example {
   *      @Reflect.metadata(key, value)
   *      static staticMethod() { }
   *  }
   *
   *  // method (on prototype)
   *  class Example {
   *      @Reflect.metadata(key, value)
   *      method() { }
   *  }
   * ```
   */
  function metadata(metadataKey: any, metadataValue: any): {
    (target: Function): void;
    (target: Object, targetKey: string | symbol): void;
  };
}
