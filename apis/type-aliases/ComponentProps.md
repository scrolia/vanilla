[@scrolia/vanilla](../README.md) / ComponentProps

# Type Alias: ComponentProps\<T\>

```ts
type ComponentProps<T> = Partial<Omit<HTMLElementTagNameMap[T], "style"> & object>;
```

Defined in: package/src/@types/component.ts:10

Component properties.

## Type Parameters

### T

`T` *extends* keyof `HTMLElementTagNameMap`
