fuser -k 4200/tcp
ember s --environment=production > logs/ember-serve.log 2>&1 &
