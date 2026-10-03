# iOS-quickdraw-react

A React Native prototype of a *Quick, Draw!*-style game: a word is shown, you draw it on a canvas against a timer, and an online handwriting-recognition service tries to guess the word from your strokes. UI in German and English.

> Status: **prototype, not maintained** (code from Jan 2024, published as a copy in Jun 2024). Home and draw screens work; the finish screen / round logic is still a TODO. The recognition call uses an unofficial third-party web endpoint that may stop working. See [drawclash](https://github.com/weisser-dev/drawclash) for the original idea. [QuickDrawReactNative](https://github.com/weisser-dev/QuickDrawReactNative) is a duplicate (private) copy of this code.

## Tech stack

React Native 0.73, TypeScript, React Navigation, `@shopify/react-native-skia` (drawing canvas), i18next (`locales/de`, `locales/en`), Jest + Testing Library.

## Structure

`screens/` (Home, Draw, Finish) | `components/` | `hooks/` (`useDrawing`, `useTimer`, `useScore`) | `utils/GuessWords.ts` (recognition request) | `data/words.json` (word list)

## Run

Set up the [React Native environment](https://reactnative.dev/docs/environment-setup) first.

```bash
npm install
npm start            # Metro bundler
npm run android      # or: npm run ios
npm test
```
