alter table lectures add constraint uniq_course_lec
    unique (course_code, lecture_num);

alter table courses
    add column grad_level text,
    add column handbook_prereqs text,
    add column prereqs json;