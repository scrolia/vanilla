[@scrolia/vanilla](../README.md) / ComponentProps

# Type Alias: ComponentProps\<T\>

```ts
type ComponentProps<T> = Partial<Omit<HTMLElementTagNameMap[T], "style"> & object>;
```

Defined in: [package/src/@types/component.ts:10](https://github.com/scrolia/vanilla/blob/71d11a743faf8de64b56201c92ff9484fdce9f24/package/src/@types/component.ts#L10)

Component properties.

## Type Parameters

### T

`T` *extends* keyof `HTMLElementTagNameMap`
