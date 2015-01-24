source .config/aws-config.sh
export DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export LOGFILE="$DIR/logs/ember-serve-production.log"
cd $DIR
touch $LOGFILE
fuser -k 4200/tcp
fuser -k 35729/tcp
ember s --environment=production > $LOGFILE 2>&1 &
echo "Reporting to $LOGFILE"
