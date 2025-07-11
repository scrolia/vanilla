[@scrolia/vanilla](../README.md) / ComponentProps

# Type Alias: ComponentProps\<T\>

```ts
type ComponentProps<T> = Partial<Omit<HTMLElementTagNameMap[T], "style"> & object>;
```

Defined in: [package/src/@types/component.ts:10](https://github.com/scrolia/vanilla/blob/c815e216f987f48e097bcb0896f128fe43b9f55a/package/src/@types/component.ts#L10)

Component properties.

## Type Parameters

### T

`T` *extends* keyof `HTMLElementTagNameMap`
