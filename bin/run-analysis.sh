# make sure you're in cd server, pipenv shell
set -xeu
for course in ~/Desktop/UNSW/Honours\ 2020\ Terry\ -\ Dataset\ -\ Documents/Dataset/DATASET_PDF_CSE/*; do
    course_name=`basename "$course"`
    if [ "${course_name:0:1}" = "i" ]; then
        echo "Skipping ignored course $course_name."
        continue
    fi
    course_name="${course_name:0:8}"
    lec_num=1
    for lec in "$course"/*; do
    echo "$lec"
        python3 curriculum-analysis/main.py \
            -c $course_name \
            -n $lec_num \
            --override
        ((lec_num++))
    done
done
