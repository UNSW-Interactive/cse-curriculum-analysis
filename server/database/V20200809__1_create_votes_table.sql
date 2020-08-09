create table votes (
    course_a varchar(8),
    course_b varchar(8),
    likes int default 0 check (likes >= 0),
    dislikes int default 0 check (dislikes >= 0),

    foreign key (course_a) references courses(course_code),
    foreign key (course_b) references courses(course_code),
    constraint uniq_course_voting unique (course_a, course_b)
);
