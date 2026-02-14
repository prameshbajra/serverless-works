#!/usr/bin/env sh
set -e

# Angular 10 uses webpack 4, which needs the OpenSSL legacy provider on Node 17+.
NODE_MAJOR="$(node -p "parseInt(process.versions.node.split('.')[0], 10)")"

if [ "$NODE_MAJOR" -ge 17 ]; then
  case " ${NODE_OPTIONS:-} " in
    *" --openssl-legacy-provider "*) ;;
    *)
      if [ -n "${NODE_OPTIONS:-}" ]; then
        export NODE_OPTIONS="${NODE_OPTIONS} --openssl-legacy-provider"
      else
        export NODE_OPTIONS="--openssl-legacy-provider"
      fi
      ;;
  esac
fi

exec node ./node_modules/@angular/cli/bin/ng "$@"
