create table words (
    word text,
    lecture_num int,
    course_code varchar(8),
    occurrences int,
    foreign key (course_code, lecture_num) references lectures(course_code, lecture_num)
    -- foreign key (lecture_num) references lectures(lecture_num)
);

-- cat ./query.sql | docker exec -i cse-curriculum-analysis_db_1 psql -U postgres