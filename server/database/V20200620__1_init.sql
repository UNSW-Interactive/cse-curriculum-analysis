create user docker;
create database docker;
grant all privileges on database docker to docker;

-- schemas
create table courses(
    course_code varchar(8) check (course_code ~ '^[A-Z]{4}[0-9]{4}$'),
    course_name text not null,
    host_url text,
    outline text,

    primary key (course_code)
);

create table lectures(
    course_code varchar(8),
    lecture_num integer,
    keywords text[],
    wp_pages text[],
    categories text[],
    parsr_json json not null,
    foreign key (course_code) references courses(course_code)
);