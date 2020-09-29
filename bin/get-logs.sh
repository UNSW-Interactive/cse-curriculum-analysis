set -xeu
currdate=`date +%Y%m%d"-"%H_%M_%S`
if [ ! -d "logs" ]; then
    mkdir logs
fi
docker logs cse-curriculum-analysis_api_1 &> "logs/$currdate.log"