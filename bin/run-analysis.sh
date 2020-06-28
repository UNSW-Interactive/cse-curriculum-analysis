for course in ~/Desktop/UNSW/Honours\ 2020\ Terry\ -\ Dataset\ -\ Documents/Dataset/DATASET_PDF_CSE/*; do
    course_name=`basename "$course"`
    course_name="${course_name:0:8}"
    lec_num=1
    for lec in "$course"/*; do
    echo "$lec"
        python3 curriculum-analysis/main.py \
            -f "$lec" \
            -c $course_name \
            -n $lec_num \
            --override
        ((lec_num++))
    done
done
