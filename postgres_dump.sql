--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-03-20 19:54:27 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: herbertma
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO herbertma;

--
-- TOC entry 3282 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: herbertma
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 17636)
-- Name: answer_options; Type: TABLE; Schema: public; Owner: herbertma
--

CREATE TABLE public.answer_options (
    id integer NOT NULL,
    option_text character varying(128)
);


ALTER TABLE public.answer_options OWNER TO herbertma;

--
-- TOC entry 200 (class 1259 OID 17634)
-- Name: answer_options_id_seq; Type: SEQUENCE; Schema: public; Owner: herbertma
--

CREATE SEQUENCE public.answer_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answer_options_id_seq OWNER TO herbertma;

--
-- TOC entry 3285 (class 0 OID 0)
-- Dependencies: 200
-- Name: answer_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herbertma
--

ALTER SEQUENCE public.answer_options_id_seq OWNED BY public.answer_options.id;


--
-- TOC entry 205 (class 1259 OID 17657)
-- Name: answers; Type: TABLE; Schema: public; Owner: herbertma
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    question_num integer,
    option_id integer
);


ALTER TABLE public.answers OWNER TO herbertma;

--
-- TOC entry 204 (class 1259 OID 17655)
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: herbertma
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO herbertma;

--
-- TOC entry 3288 (class 0 OID 0)
-- Dependencies: 204
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herbertma
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- TOC entry 203 (class 1259 OID 17644)
-- Name: questions; Type: TABLE; Schema: public; Owner: herbertma
--

CREATE TABLE public.questions (
    num integer NOT NULL,
    answer integer,
    question_text character varying(256)
);


ALTER TABLE public.questions OWNER TO herbertma;

--
-- TOC entry 202 (class 1259 OID 17642)
-- Name: questions_num_seq; Type: SEQUENCE; Schema: public; Owner: herbertma
--

CREATE SEQUENCE public.questions_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_num_seq OWNER TO herbertma;

--
-- TOC entry 3291 (class 0 OID 0)
-- Dependencies: 202
-- Name: questions_num_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herbertma
--

ALTER SEQUENCE public.questions_num_seq OWNED BY public.questions.num;


--
-- TOC entry 3129 (class 2604 OID 17639)
-- Name: answer_options id; Type: DEFAULT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answer_options ALTER COLUMN id SET DEFAULT nextval('public.answer_options_id_seq'::regclass);


--
-- TOC entry 3131 (class 2604 OID 17660)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- TOC entry 3130 (class 2604 OID 17647)
-- Name: questions num; Type: DEFAULT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.questions ALTER COLUMN num SET DEFAULT nextval('public.questions_num_seq'::regclass);


--
-- TOC entry 3272 (class 0 OID 17636)
-- Dependencies: 201
-- Data for Name: answer_options; Type: TABLE DATA; Schema: public; Owner: herbertma
--

COPY public.answer_options (id, option_text) FROM stdin;
5	BC
6	Calgary
7	Ontario
8	Nunavet
1	4
2	8
3	2
4	1
\.


--
-- TOC entry 3276 (class 0 OID 17657)
-- Dependencies: 205
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: herbertma
--

COPY public.answers (id, question_num, option_id) FROM stdin;
1	1	1
2	1	2
3	2	3
4	2	4
5	3	5
6	3	6
7	3	7
8	3	8
\.


--
-- TOC entry 3274 (class 0 OID 17644)
-- Dependencies: 203
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: herbertma
--

COPY public.questions (num, answer, question_text) FROM stdin;
1	1	What is 2+2
2	3	What is 1+1
3	5	What province is Vancouver located in
\.


--
-- TOC entry 3293 (class 0 OID 0)
-- Dependencies: 200
-- Name: answer_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herbertma
--

SELECT pg_catalog.setval('public.answer_options_id_seq', 8, true);


--
-- TOC entry 3294 (class 0 OID 0)
-- Dependencies: 204
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herbertma
--

SELECT pg_catalog.setval('public.answers_id_seq', 8, true);


--
-- TOC entry 3295 (class 0 OID 0)
-- Dependencies: 202
-- Name: questions_num_seq; Type: SEQUENCE SET; Schema: public; Owner: herbertma
--

SELECT pg_catalog.setval('public.questions_num_seq', 3, true);


--
-- TOC entry 3133 (class 2606 OID 17641)
-- Name: answer_options answer_options_pkey; Type: CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answer_options
    ADD CONSTRAINT answer_options_pkey PRIMARY KEY (id);


--
-- TOC entry 3137 (class 2606 OID 17662)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 3135 (class 2606 OID 17649)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (num);


--
-- TOC entry 3140 (class 2606 OID 17668)
-- Name: answers answers_option_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_option_id_fkey FOREIGN KEY (option_id) REFERENCES public.answer_options(id);


--
-- TOC entry 3139 (class 2606 OID 17663)
-- Name: answers answers_question_num_fkey; Type: FK CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_num_fkey FOREIGN KEY (question_num) REFERENCES public.questions(num);


--
-- TOC entry 3138 (class 2606 OID 17650)
-- Name: questions questions_answer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: herbertma
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_answer_fkey FOREIGN KEY (answer) REFERENCES public.answer_options(id);


--
-- TOC entry 3283 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: herbertma
--

GRANT ALL ON SCHEMA public TO "ec2-user";


--
-- TOC entry 3284 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE answer_options; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON TABLE public.answer_options TO "ec2-user";


--
-- TOC entry 3286 (class 0 OID 0)
-- Dependencies: 200
-- Name: SEQUENCE answer_options_id_seq; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON SEQUENCE public.answer_options_id_seq TO "ec2-user";


--
-- TOC entry 3287 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE answers; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON TABLE public.answers TO "ec2-user";


--
-- TOC entry 3289 (class 0 OID 0)
-- Dependencies: 204
-- Name: SEQUENCE answers_id_seq; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON SEQUENCE public.answers_id_seq TO "ec2-user";


--
-- TOC entry 3290 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE questions; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON TABLE public.questions TO "ec2-user";


--
-- TOC entry 3292 (class 0 OID 0)
-- Dependencies: 202
-- Name: SEQUENCE questions_num_seq; Type: ACL; Schema: public; Owner: herbertma
--

GRANT ALL ON SEQUENCE public.questions_num_seq TO "ec2-user";


-- Completed on 2021-03-20 19:54:28 PDT

--
-- PostgreSQL database dump complete
--

