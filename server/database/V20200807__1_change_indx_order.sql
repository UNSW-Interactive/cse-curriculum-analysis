alter table words drop constraint uniq_words_lec;

-- change the order of the index
alter table words add constraint uniq_words_course_lec
    unique (word, course_code, lecture_num);