# Make tmp dir
mkdir ./dist-prod
# Build ember
ember build --environment=production --output-path=./dist-prod
# Remove old dist
rm -r /usr/share/nginx/selby.io/*
# Copy new build
cp -r ./dist-prod/* /usr/share/nginx/selby.io/
# Remove tmp dir
rm -r ./dist-prod
