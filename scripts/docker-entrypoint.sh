#!/usr/bin/env sh
# Entrypoint do container: garante o tema na versão pinada e executa o hugo.
# Recebe os argumentos do comando do compose (ex.: server --bind 0.0.0.0 ...).
set -eu

sh /project/scripts/setup-theme.sh
exec hugo "$@"
