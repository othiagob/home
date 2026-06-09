#!/usr/bin/env sh
set -eu

THEME_DIR="${THEME_DIR:-themes/archie}"
ARCHIE_VERSION="${ARCHIE_VERSION:-cbc1c3aaa2615fa348b85ef39eb4570cd3ac6414}"
ARCHIE_REPOSITORY="${ARCHIE_REPOSITORY:-https://github.com/athul/archie.git}"

if [ -d "$THEME_DIR/.git" ] &&
  [ "$(git -C "$THEME_DIR" rev-parse HEAD 2>/dev/null || true)" = "$ARCHIE_VERSION" ]; then
  echo "Archie $ARCHIE_VERSION is already installed."
  exit 0
fi

rm -rf "$THEME_DIR"
mkdir -p "$THEME_DIR"
git -C "$THEME_DIR" init --quiet
git -C "$THEME_DIR" remote add origin "$ARCHIE_REPOSITORY"
git -C "$THEME_DIR" fetch --depth 1 origin "$ARCHIE_VERSION"
git -C "$THEME_DIR" checkout --quiet --detach FETCH_HEAD

echo "Installed Archie $ARCHIE_VERSION."
