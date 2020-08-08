alter table words add constraint uniq_words_lec
    unique (word, lecture_num, course_code);