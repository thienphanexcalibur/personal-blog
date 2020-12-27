node stdou.js | xargs -I '{}' cross-env av='{}' mode=<development|production> webpack  --config=<your-webpack-config-path>
