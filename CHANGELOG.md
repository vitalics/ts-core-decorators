# Changelog

## [Unreleased]

## [1.1.2]@beta.1

### ADDED
- `@pure()` decorator for property and symbols
### FIX
- pure change detection
`@save()` decorator duplicate error to console, if occured

### STABLE decorators
- `@timerify()`
- `@log()`
- `@autowired()`
- `@select()`

### COMMON ISSUES
- `@pure()` decorator parameter doesn't work without `@pure()` method decorator
- `@save()` isn't work, if have an error in decorator before

### FUTURE decorators(draft)
- `@contract()` for method and property
- Http decorators for property (may be method too :) )
- (pre/post)Execute

## [Future decorators]

Serilization:
- json
- xml

Threading:
- parallel/worker
- delay/debonce
- repeat

Others:
- listen/onChange
- http
- contract
- (pre/post)Execute

## [Release]

## [1.0.33]

### ADDED
- `@trigger()` decorator for class
- `@save()` decorator that make method saved - continue function executing, even if catching error

### STABLE decorators
- `@timerify()`
- `@log()`
- `@autowired()`
- `@select()`
