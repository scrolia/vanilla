[@scrolia/vanilla](../README.md) / ComponentProps

# Type Alias: ComponentProps\<T\>

```ts
type ComponentProps<T> = Partial<Omit<HTMLElementTagNameMap[T], "style"> & object>;
```

Defined in: [package/src/@types/component.ts:10](https://github.com/scrolia/vanilla/blob/d5b9981d7613b9946bfacdcfeac4dfdbcb0dbf18/package/src/@types/component.ts#L10)

Component properties.

## Type Parameters

### T

`T` *extends* keyof `HTMLElementTagNameMap`
