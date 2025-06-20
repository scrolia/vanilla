[@scrolia/vanilla](../README.md) / CreateScrollbar

# Type Alias: CreateScrollbar

```ts
type CreateScrollbar = object;
```

Defined in: [package/src/base/index.ts:21](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L21)

Result of the `createScrollbar` function.

## Properties

### attach()

```ts
attach: (el) => () => void;
```

Defined in: [package/src/base/index.ts:25](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L25)

Attaches complete scrollbar function into the element.

#### Parameters

##### el

`HTMLElement`

#### Returns

```ts
(): void;
```

##### Returns

`void`

***

### container

```ts
container: CreateContainer;
```

Defined in: [package/src/base/index.ts:29](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L29)

Container functions.

***

### content

```ts
content: CreateContent;
```

Defined in: [package/src/base/index.ts:33](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L33)

Content functions.

***

### thumbX

```ts
thumbX: CreateThumbX;
```

Defined in: [package/src/base/index.ts:45](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L45)

Horizontal thumb functions.

***

### thumbY

```ts
thumbY: CreateThumbY;
```

Defined in: [package/src/base/index.ts:49](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L49)

Vertical thumb functions.

***

### trackX

```ts
trackX: CreateTrackX;
```

Defined in: [package/src/base/index.ts:37](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L37)

Horizontal track functions.

***

### trackY

```ts
trackY: CreateTrackY;
```

Defined in: [package/src/base/index.ts:41](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L41)

Vertical track functions.
