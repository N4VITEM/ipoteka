cd backend || {
  echo "Не удалось перейти в директорию 'backend'. Убедитесь, что директория существует."
  exit 1
}
docker-compose up -d || {
  echo "Не удалось запустить docker-compose. Проверьте, установлен ли Docker и правильно ли настроен docker-compose.yml."
  exit 1
}
npm start || {
  echo "Не удалось запустить 'npm start'. Проверьте, установлен ли Node.js и имеются ли необходимые зависимости."
  exit 1
}