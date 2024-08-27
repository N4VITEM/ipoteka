cd backend/src/Scripts || {
  echo "Не удалось перейти в директорию 'backend'. Убедитесь, что директория существует."
  exit 1
}
ts-node Hypoteka.script.ts || {
  echo "че-то не так"
  exit 1
}