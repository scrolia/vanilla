[@scrolia/vanilla](../README.md) / CreateScrollbar

# Type Alias: CreateScrollbar

```ts
type CreateScrollbar = object;
```

Defined in: package/src/components/index.ts:33

Result of the `createScrollbar` function.

## Properties

### attach()

```ts
attach: (el, options?) => () => void;
```

Defined in: package/src/components/index.ts:37

Attaches complete scrollbar function into the element.

#### Parameters

##### el

`HTMLElement`

##### options?

`AttachOptions`

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

Defined in: package/src/components/index.ts:41

Container functions.

***

### content

```ts
content: CreateContent;
```

Defined in: package/src/components/index.ts:45

Content functions.

***

### thumbX

```ts
thumbX: CreateThumbX;
```

Defined in: package/src/components/index.ts:57

Horizontal thumb functions.

***

### thumbY

```ts
thumbY: CreateThumbY;
```

Defined in: package/src/components/index.ts:61

Vertical thumb functions.

***

### trackX

```ts
trackX: CreateTrackX;
```

Defined in: package/src/components/index.ts:49

Horizontal track functions.

***

### trackY

```ts
trackY: CreateTrackY;
```

Defined in: package/src/components/index.ts:53

Vertical track functions.
