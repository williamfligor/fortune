// ESM entry point. The implementation is CommonJS, so this wrapper just
// re-exports it with real named exports; without it, `import { fortune }`
// would not be statically analyzable.
import fortune from './fortune.js';

export default fortune;
export { fortune };
