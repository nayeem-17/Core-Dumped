/*
 Navicat Premium Data Transfer

 Source Server         : tommy.orcl_remote
 Source Server Type    : Oracle
 Source Server Version : 120200
 Source Host           : 103.94.135.201:1521
 Source Schema         : TOMMY

 Target Server Type    : Oracle
 Target Server Version : 120200
 File Encoding         : 65001

 Date: 30/01/2022 16:27:36
*/


-- ----------------------------
-- Table structure for ANSWER
-- ----------------------------
DROP TABLE "TOMMY"."ANSWER";
CREATE TABLE "TOMMY"."ANSWER" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77884".nextval NOT NULL,
  "TITLE" VARCHAR2(1024 BYTE) VISIBLE NOT NULL,
  "ANSWER" VARCHAR2(2000 BYTE) VISIBLE NOT NULL,
  "CONTRIBUTED_BY" NUMBER VISIBLE,
  "QUESTION_ID" NUMBER VISIBLE,
  "CREATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP,
  "UPDATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ANSWER
-- ----------------------------

-- ----------------------------
-- Table structure for ANSWER_COMMENT
-- ----------------------------
DROP TABLE "TOMMY"."ANSWER_COMMENT";
CREATE TABLE "TOMMY"."ANSWER_COMMENT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77893".nextval NOT NULL,
  "ANSWER_ID" NUMBER VISIBLE,
  "COMMENT_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ANSWER_COMMENT
-- ----------------------------

-- ----------------------------
-- Table structure for ANSWER_REACT
-- ----------------------------
DROP TABLE "TOMMY"."ANSWER_REACT";
CREATE TABLE "TOMMY"."ANSWER_REACT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77911".nextval NOT NULL,
  "ANSWER_ID" NUMBER VISIBLE,
  "REACT" CHAR(1 BYTE) VISIBLE,
  "REACTED_BY" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ANSWER_REACT
-- ----------------------------

-- ----------------------------
-- Table structure for ARTICLE
-- ----------------------------
DROP TABLE "TOMMY"."ARTICLE";
CREATE TABLE "TOMMY"."ARTICLE" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77887".nextval NOT NULL,
  "TITLE" VARCHAR2(1024 BYTE) VISIBLE NOT NULL,
  "CONTENT" VARCHAR2(2000 BYTE) VISIBLE NOT NULL,
  "CONTRIBUTED_BY" NUMBER VISIBLE,
  "CREATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP,
  "UPDATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ARTICLE
-- ----------------------------

-- ----------------------------
-- Table structure for ARTICLE_COMMENT
-- ----------------------------
DROP TABLE "TOMMY"."ARTICLE_COMMENT";
CREATE TABLE "TOMMY"."ARTICLE_COMMENT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77899".nextval NOT NULL,
  "ARTICLE_ID" NUMBER VISIBLE,
  "COMMENT_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ARTICLE_COMMENT
-- ----------------------------

-- ----------------------------
-- Table structure for ARTICLE_REACT
-- ----------------------------
DROP TABLE "TOMMY"."ARTICLE_REACT";
CREATE TABLE "TOMMY"."ARTICLE_REACT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77914".nextval NOT NULL,
  "ARTICLE_ID" NUMBER VISIBLE,
  "REACT" CHAR(1 BYTE) VISIBLE,
  "REACTED_BY" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ARTICLE_REACT
-- ----------------------------

-- ----------------------------
-- Table structure for ARTICLE_TAG
-- ----------------------------
DROP TABLE "TOMMY"."ARTICLE_TAG";
CREATE TABLE "TOMMY"."ARTICLE_TAG" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77902".nextval NOT NULL,
  "ARTICLE_ID" NUMBER VISIBLE,
  "TAG_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ARTICLE_TAG
-- ----------------------------

-- ----------------------------
-- Table structure for BADGE
-- ----------------------------
DROP TABLE "TOMMY"."BADGE";
CREATE TABLE "TOMMY"."BADGE" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77863".nextval NOT NULL,
  "TITLE" VARCHAR2(64 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BADGE
-- ----------------------------

-- ----------------------------
-- Table structure for COMMENTS
-- ----------------------------
DROP TABLE "TOMMY"."COMMENTS";
CREATE TABLE "TOMMY"."COMMENTS" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77890".nextval NOT NULL,
  "TEXT" VARCHAR2(1024 BYTE) VISIBLE NOT NULL,
  "CONTRIBUTED_BY" NUMBER VISIBLE,
  "CREATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP,
  "UPDATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of COMMENTS
-- ----------------------------

-- ----------------------------
-- Table structure for FOLLOW
-- ----------------------------
DROP TABLE "TOMMY"."FOLLOW";
CREATE TABLE "TOMMY"."FOLLOW" (
  "FOLLOWER" NUMBER VISIBLE NOT NULL,
  "FOLLOWING" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of FOLLOW
-- ----------------------------

-- ----------------------------
-- Table structure for ORGANIZATION
-- ----------------------------
DROP TABLE "TOMMY"."ORGANIZATION";
CREATE TABLE "TOMMY"."ORGANIZATION" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77875".nextval NOT NULL,
  "NAME" VARCHAR2(128 BYTE) VISIBLE NOT NULL,
  "ADDRESS" VARCHAR2(256 BYTE) VISIBLE,
  "PLAN" NUMBER VISIBLE,
  "DURATION" NUMBER VISIBLE DEFAULT 0,
  "ISACTIVE" CHAR(1 BYTE) VISIBLE DEFAULT 'n'
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ORGANIZATION
-- ----------------------------
INSERT INTO "TOMMY"."ORGANIZATION" VALUES ('0', 'GLOBAL', 'EARTH', '0', '10000', 'n');

-- ----------------------------
-- Table structure for PLANNING
-- ----------------------------
DROP TABLE "TOMMY"."PLANNING";
CREATE TABLE "TOMMY"."PLANNING" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77872".nextval NOT NULL,
  "TITLE" VARCHAR2(128 BYTE) VISIBLE NOT NULL,
  "AMOUNT" NUMBER VISIBLE DEFAULT 0
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of PLANNING
-- ----------------------------
INSERT INTO "TOMMY"."PLANNING" VALUES ('0', 'DEFAULT', '0');

-- ----------------------------
-- Table structure for PROFILE
-- ----------------------------
DROP TABLE "TOMMY"."PROFILE";
CREATE TABLE "TOMMY"."PROFILE" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77858".nextval NOT NULL,
  "USERNAME" VARCHAR2(64 BYTE) VISIBLE NOT NULL,
  "FIRST_NAME" VARCHAR2(64 BYTE) VISIBLE NOT NULL,
  "LAST_NAME" VARCHAR2(64 BYTE) VISIBLE NOT NULL,
  "PASSWORD" VARCHAR2(128 BYTE) VISIBLE NOT NULL,
  "BIRTHDATE" DATE VISIBLE,
  "EMAIL" VARCHAR2(128 BYTE) VISIBLE,
  "PROFILE_PICTURE" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of PROFILE
-- ----------------------------
INSERT INTO "TOMMY"."PROFILE" VALUES ('75', 'tommy_vercetti', 'Tommy', 'Vercetti', 'xb1opUDoNpY3nR2b+/RWlg==$oCUCYvEHKDudzDVtGHBpbeuVe6GvJxr9k/6E/Yv+XpOkYl7oJNjXnbfdUxFqsb4X7/lMxipMc4y9xYjTaeIt4A==', NULL, 'tommy@gmail.com', NULL);
INSERT INTO "TOMMY"."PROFILE" VALUES ('89', 'youcannotseeme', 'John', 'Cena', 'iou03RhZ0MZ15UYNlFGSfw==$Q9gn+EZbaV0GGyEUIzfa5iIoVfrPTBUAf9gtuUMXMgSjlDNuZm83auAtlikUvA64FA1WgPEH3Hfr/x/qeg0zLA==', NULL, 'abc@gmail.com', NULL);
INSERT INTO "TOMMY"."PROFILE" VALUES ('77', 'mofo', 'MOther', 'FAther', 'oJQDkNj4vWFWbrdfYAKpGw==$206oZ4sNRs6WHqgFUiJLvwAaaVOe8zdYwRQ9x5HSUQ8YxmjekqlXV3wntwXp4yFmY6aI6AGcowL+VLYW4mRTlQ==', NULL, 'mofo@gmail.com', NULL);
INSERT INTO "TOMMY"."PROFILE" VALUES ('109', 'mecha', 'Mecha', 'Mesmerises', 'cdYXBkl3gfSqesuy5F4uFg==$7gztC4rKcCCZvhEu+cmDGwJ4d83Tc5b21GWdAMiKCWtZrFNqqQhJ3OelnNt3bRqVDT9bz1JY8K4CQmL6spSlLg==', NULL, 'mecha@gmail.com', NULL);

-- ----------------------------
-- Table structure for QUESTION
-- ----------------------------
DROP TABLE "TOMMY"."QUESTION";
CREATE TABLE "TOMMY"."QUESTION" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77881".nextval NOT NULL,
  "TITLE" VARCHAR2(1024 BYTE) VISIBLE NOT NULL,
  "CONTENT" VARCHAR2(2000 BYTE) VISIBLE NOT NULL,
  "CONTRIBUTED_BY" NUMBER VISIBLE,
  "ORGANIZATION_ID" NUMBER VISIBLE,
  "CREATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP,
  "UPDATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of QUESTION
-- ----------------------------
INSERT INTO "TOMMY"."QUESTION" VALUES ('3', 'How you doing??', '<p>So here goes my first C++ code .</p><pre class="ql-syntax" spellcheck="false">#include &lt;iostream&gt;
    using namespace std;
    int main(){
      cout&lt;&lt;"Hello World"&lt;&lt;endl;
    }
    
</pre><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/Zso1-vyzkhw?showinfo=0"></iframe><p><br></p>', '75', '0', TO_TIMESTAMP('2022-01-29 06:44:33.000000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), TO_TIMESTAMP('2022-01-29 12:44:33.842903', 'SYYYY-MM-DD HH24:MI:SS:FF6'));
INSERT INTO "TOMMY"."QUESTION" VALUES ('4', 'How does my first JAVA program looks like?', '<pre class="ql-syntax" spellcheck="false">public static void main(String args[]){
  System.out.println("Haha vodox");
}
</pre><p><br></p>', '75', '0', TO_TIMESTAMP('2022-01-29 06:45:42.000000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), TO_TIMESTAMP('2022-01-29 12:45:42.873812', 'SYYYY-MM-DD HH24:MI:SS:FF6'));
INSERT INTO "TOMMY"."QUESTION" VALUES ('5', 'How did StackOverflow manage their shitty schema?', '<p>So, right now I''m working on a project that replicates StackOverflow which is more costly and less efficient.</p><p><br></p>', '75', '0', TO_TIMESTAMP('2022-01-29 07:13:14.000000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), TO_TIMESTAMP('2022-01-29 13:13:14.593975', 'SYYYY-MM-DD HH24:MI:SS:FF6'));

-- ----------------------------
-- Table structure for QUESTION_COMMENT
-- ----------------------------
DROP TABLE "TOMMY"."QUESTION_COMMENT";
CREATE TABLE "TOMMY"."QUESTION_COMMENT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77896".nextval NOT NULL,
  "QUESTION_ID" NUMBER VISIBLE,
  "COMMENT_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of QUESTION_COMMENT
-- ----------------------------

-- ----------------------------
-- Table structure for QUESTION_REACT
-- ----------------------------
DROP TABLE "TOMMY"."QUESTION_REACT";
CREATE TABLE "TOMMY"."QUESTION_REACT" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77908".nextval NOT NULL,
  "QUESTION_ID" NUMBER VISIBLE,
  "REACT" CHAR(1 BYTE) VISIBLE,
  "REACTED_BY" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of QUESTION_REACT
-- ----------------------------

-- ----------------------------
-- Table structure for QUESTION_TAG
-- ----------------------------
DROP TABLE "TOMMY"."QUESTION_TAG";
CREATE TABLE "TOMMY"."QUESTION_TAG" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77905".nextval NOT NULL,
  "QUESTION_ID" NUMBER VISIBLE,
  "TAG_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of QUESTION_TAG
-- ----------------------------

-- ----------------------------
-- Table structure for RESOURCES
-- ----------------------------
DROP TABLE "TOMMY"."RESOURCES";
CREATE TABLE "TOMMY"."RESOURCES" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77855".nextval NOT NULL,
  "TYPE" VARCHAR2(64 BYTE) VISIBLE NOT NULL,
  "URL" VARCHAR2(128 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of RESOURCES
-- ----------------------------

-- ----------------------------
-- Table structure for TAG
-- ----------------------------
DROP TABLE "TOMMY"."TAG";
CREATE TABLE "TOMMY"."TAG" (
  "ID" NUMBER VISIBLE NOT NULL,
  "TITLE" VARCHAR2(64 BYTE) VISIBLE NOT NULL,
  "CREATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP,
  "UPDATED_AT" TIMESTAMP(6) VISIBLE DEFAULT CURRENT_TIMESTAMP
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of TAG
-- ----------------------------

-- ----------------------------
-- Table structure for USER_ORGANIZATION_RELATIONSHIP
-- ----------------------------
DROP TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP";
CREATE TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" (
  "ID" NUMBER VISIBLE DEFAULT "TOMMY"."ISEQ$$_77878".nextval NOT NULL,
  "ORGANIZATION_ID" NUMBER VISIBLE,
  "USERNAME" VARCHAR2(64 BYTE) VISIBLE,
  "BADGE_ID" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of USER_ORGANIZATION_RELATIONSHIP
-- ----------------------------

-- ----------------------------
-- Sequence structure for DEMO_SEQ
-- ----------------------------
DROP SEQUENCE "TOMMY"."DEMO_SEQ";
CREATE SEQUENCE "TOMMY"."DEMO_SEQ" MINVALUE 1 MAXVALUE 909990900909 INCREMENT BY 10 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77855
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77855";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77855" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77858
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77858";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77858" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77863
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77863";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77863" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77869
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77869";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77869" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77872
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77872";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77872" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77875
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77875";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77875" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77878
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77878";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77878" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77881
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77881";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77881" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77884
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77884";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77884" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77887
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77887";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77887" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77890
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77890";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77890" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77893
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77893";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77893" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77896
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77896";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77896" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77899
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77899";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77899" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77902
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77902";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77902" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77905
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77905";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77905" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77908
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77908";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77908" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77911
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77911";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77911" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_77914
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_77914";
CREATE SEQUENCE "TOMMY"."ISEQ$$_77914" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78163
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78163";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78163" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78166
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78166";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78166" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78169
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78169";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78169" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78173
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78173";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78173" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78176
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78176";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78176" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78179
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78179";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78179" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78182
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78182";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78182" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78185
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78185";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78185" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78188
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78188";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78188" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78192
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78192";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78192" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78196
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78196";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78196" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78199
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78199";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78199" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78202
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78202";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78202" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78205
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78205";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78205" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78208
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78208";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78208" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78214
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78214";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78214" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78217
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78217";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78217" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78220
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78220";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78220" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78229
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78229";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78229" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78269
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78269";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78269" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78272
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78272";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78272" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78275
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78275";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78275" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78278
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78278";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78278" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78281
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78281";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78281" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78284
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78284";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78284" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78287
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78287";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78287" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78290
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78290";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78290" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_78293
-- ----------------------------
DROP SEQUENCE "TOMMY"."ISEQ$$_78293";
CREATE SEQUENCE "TOMMY"."ISEQ$$_78293" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Primary Key structure for table ANSWER
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "SYS_C0011019" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ANSWER
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "SYS_C0011016" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "SYS_C0011017" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "SYS_C0011018" CHECK ("ANSWER" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ANSWER_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_COMMENT" ADD CONSTRAINT "SYS_C0011032" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ANSWER_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_COMMENT" ADD CONSTRAINT "SYS_C0011031" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ANSWER_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_REACT" ADD CONSTRAINT "SYS_C0011056" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ANSWER_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_REACT" ADD CONSTRAINT "SYS_C0011055" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ARTICLE
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE" ADD CONSTRAINT "SYS_C0011025" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ARTICLE
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE" ADD CONSTRAINT "SYS_C0011022" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ARTICLE" ADD CONSTRAINT "SYS_C0011023" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ARTICLE" ADD CONSTRAINT "SYS_C0011024" CHECK ("CONTENT" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ARTICLE_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_COMMENT" ADD CONSTRAINT "SYS_C0011040" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ARTICLE_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_COMMENT" ADD CONSTRAINT "SYS_C0011039" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ARTICLE_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_REACT" ADD CONSTRAINT "SYS_C0011060" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ARTICLE_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_REACT" ADD CONSTRAINT "SYS_C0011059" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ARTICLE_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_TAG" ADD CONSTRAINT "SYS_C0011044" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ARTICLE_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_TAG" ADD CONSTRAINT "SYS_C0011043" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table BADGE
-- ----------------------------
ALTER TABLE "TOMMY"."BADGE" ADD CONSTRAINT "SYS_C0010991" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table BADGE
-- ----------------------------
ALTER TABLE "TOMMY"."BADGE" ADD CONSTRAINT "SYS_C0010990" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table COMMENTS
-- ----------------------------
ALTER TABLE "TOMMY"."COMMENTS" ADD CONSTRAINT "SYS_C0011029" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table COMMENTS
-- ----------------------------
ALTER TABLE "TOMMY"."COMMENTS" ADD CONSTRAINT "SYS_C0011027" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."COMMENTS" ADD CONSTRAINT "SYS_C0011028" CHECK ("TEXT" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table FOLLOW
-- ----------------------------
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "FOLLOW_PK" PRIMARY KEY ("FOLLOWER", "FOLLOWING");

-- ----------------------------
-- Checks structure for table FOLLOW
-- ----------------------------
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "FOLLOW_SELF" CHECK ( FOLLOWER <> FOLLOWING) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "SYS_C0018022" CHECK ("FOLLOWER" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "SYS_C0018023" CHECK ("FOLLOWING" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table ORGANIZATION
-- ----------------------------
ALTER TABLE "TOMMY"."ORGANIZATION" ADD CONSTRAINT "SYS_C0011003" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table ORGANIZATION
-- ----------------------------
ALTER TABLE "TOMMY"."ORGANIZATION" ADD CONSTRAINT "SYS_C0011001" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ORGANIZATION" ADD CONSTRAINT "SYS_C0011002" CHECK ("NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table PLANNING
-- ----------------------------
ALTER TABLE "TOMMY"."PLANNING" ADD CONSTRAINT "SYS_C0011000" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table PLANNING
-- ----------------------------
ALTER TABLE "TOMMY"."PLANNING" ADD CONSTRAINT "SYS_C0010998" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."PLANNING" ADD CONSTRAINT "SYS_C0010999" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table PROFILE
-- ----------------------------
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010987" PRIMARY KEY ("ID");

-- ----------------------------
-- Uniques structure for table PROFILE
-- ----------------------------
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010988" UNIQUE ("USERNAME") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table PROFILE
-- ----------------------------
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010982" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010983" CHECK ("USERNAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010984" CHECK ("FIRST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010985" CHECK ("LAST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "SYS_C0010986" CHECK ("PASSWORD" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table QUESTION
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "SYS_C0011013" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table QUESTION
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "SYS_C0011010" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "SYS_C0011011" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "SYS_C0011012" CHECK ("CONTENT" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table QUESTION_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_COMMENT" ADD CONSTRAINT "SYS_C0011036" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table QUESTION_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_COMMENT" ADD CONSTRAINT "SYS_C0011035" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table QUESTION_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_REACT" ADD CONSTRAINT "SYS_C0011052" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table QUESTION_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_REACT" ADD CONSTRAINT "SYS_C0011051" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table QUESTION_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_TAG" ADD CONSTRAINT "SYS_C0011048" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table QUESTION_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_TAG" ADD CONSTRAINT "SYS_C0011047" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table RESOURCES
-- ----------------------------
ALTER TABLE "TOMMY"."RESOURCES" ADD CONSTRAINT "SYS_C0010981" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table RESOURCES
-- ----------------------------
ALTER TABLE "TOMMY"."RESOURCES" ADD CONSTRAINT "SYS_C0010978" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."RESOURCES" ADD CONSTRAINT "SYS_C0010979" CHECK ("TYPE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."RESOURCES" ADD CONSTRAINT "SYS_C0010980" CHECK ("URL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table TAG
-- ----------------------------
ALTER TABLE "TOMMY"."TAG" ADD CONSTRAINT "SYS_C0010977" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table TAG
-- ----------------------------
ALTER TABLE "TOMMY"."TAG" ADD CONSTRAINT "SYS_C0010976" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table USER_ORGANIZATION_RELATIONSHIP
-- ----------------------------
ALTER TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" ADD CONSTRAINT "SYS_C0011006" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table USER_ORGANIZATION_RELATIONSHIP
-- ----------------------------
ALTER TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" ADD CONSTRAINT "SYS_C0011005" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ANSWER
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "ANSWER_FK" FOREIGN KEY ("CONTRIBUTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ANSWER" ADD CONSTRAINT "ANSWER_FK_1" FOREIGN KEY ("QUESTION_ID") REFERENCES "TOMMY"."QUESTION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ANSWER_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_COMMENT" ADD CONSTRAINT "ANSWER_COMMENT_FK" FOREIGN KEY ("ANSWER_ID") REFERENCES "TOMMY"."ANSWER" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ANSWER_COMMENT" ADD CONSTRAINT "ANSWER_COMMENT_FK_1" FOREIGN KEY ("COMMENT_ID") REFERENCES "TOMMY"."COMMENTS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ANSWER_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ANSWER_REACT" ADD CONSTRAINT "ANSWER_REACT_FK" FOREIGN KEY ("ANSWER_ID") REFERENCES "TOMMY"."ANSWER" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ANSWER_REACT" ADD CONSTRAINT "ANSWER_REACT_FK_1" FOREIGN KEY ("REACTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ARTICLE
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE" ADD CONSTRAINT "ARTICLE_FK" FOREIGN KEY ("CONTRIBUTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ARTICLE_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_COMMENT" ADD CONSTRAINT "ARTICLE_COMMENT_FK" FOREIGN KEY ("ARTICLE_ID") REFERENCES "TOMMY"."ARTICLE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ARTICLE_COMMENT" ADD CONSTRAINT "ARTICLE_COMMENT_FK_1" FOREIGN KEY ("COMMENT_ID") REFERENCES "TOMMY"."COMMENTS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ARTICLE_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_REACT" ADD CONSTRAINT "ARTICLE_REACT_FK" FOREIGN KEY ("ARTICLE_ID") REFERENCES "TOMMY"."ARTICLE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ARTICLE_REACT" ADD CONSTRAINT "ARTICLE_REACT_FK_1" FOREIGN KEY ("REACTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ARTICLE_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."ARTICLE_TAG" ADD CONSTRAINT "ARTICLE_TAG_FK" FOREIGN KEY ("ARTICLE_ID") REFERENCES "TOMMY"."ARTICLE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."ARTICLE_TAG" ADD CONSTRAINT "ARTICLE_TAG_FK_1" FOREIGN KEY ("TAG_ID") REFERENCES "TOMMY"."TAG" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table COMMENTS
-- ----------------------------
ALTER TABLE "TOMMY"."COMMENTS" ADD CONSTRAINT "COMMENTS_FK" FOREIGN KEY ("CONTRIBUTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FOLLOW
-- ----------------------------
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "FOLLOWER_FK" FOREIGN KEY ("FOLLOWER") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."FOLLOW" ADD CONSTRAINT "FOLLOWING_FK" FOREIGN KEY ("FOLLOWING") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ORGANIZATION
-- ----------------------------
ALTER TABLE "TOMMY"."ORGANIZATION" ADD CONSTRAINT "ORGANIZATION_FK" FOREIGN KEY ("PLAN") REFERENCES "TOMMY"."PLANNING" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table PROFILE
-- ----------------------------
ALTER TABLE "TOMMY"."PROFILE" ADD CONSTRAINT "PROFILE_FK" FOREIGN KEY ("PROFILE_PICTURE") REFERENCES "TOMMY"."RESOURCES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table QUESTION
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "QUESTION_FK" FOREIGN KEY ("CONTRIBUTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION" ADD CONSTRAINT "QUESTION_FK_1" FOREIGN KEY ("ORGANIZATION_ID") REFERENCES "TOMMY"."ORGANIZATION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table QUESTION_COMMENT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_COMMENT" ADD CONSTRAINT "QUESTION_COMMENT_FK" FOREIGN KEY ("QUESTION_ID") REFERENCES "TOMMY"."QUESTION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION_COMMENT" ADD CONSTRAINT "QUESTION_COMMENT_FK_1" FOREIGN KEY ("COMMENT_ID") REFERENCES "TOMMY"."COMMENTS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table QUESTION_REACT
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_REACT" ADD CONSTRAINT "QUESTION_REACT_FK" FOREIGN KEY ("QUESTION_ID") REFERENCES "TOMMY"."QUESTION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION_REACT" ADD CONSTRAINT "QUESTION_REACT_FK_1" FOREIGN KEY ("REACTED_BY") REFERENCES "TOMMY"."PROFILE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table QUESTION_TAG
-- ----------------------------
ALTER TABLE "TOMMY"."QUESTION_TAG" ADD CONSTRAINT "QUESTION_TAG_FK" FOREIGN KEY ("QUESTION_ID") REFERENCES "TOMMY"."QUESTION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."QUESTION_TAG" ADD CONSTRAINT "QUESTION_TAG_FK_1" FOREIGN KEY ("TAG_ID") REFERENCES "TOMMY"."TAG" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table USER_ORGANIZATION_RELATIONSHIP
-- ----------------------------
ALTER TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" ADD CONSTRAINT "USER_ORG_FK" FOREIGN KEY ("ORGANIZATION_ID") REFERENCES "TOMMY"."ORGANIZATION" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" ADD CONSTRAINT "USER_ORG_FK_1" FOREIGN KEY ("USERNAME") REFERENCES "TOMMY"."PROFILE" ("USERNAME") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TOMMY"."USER_ORGANIZATION_RELATIONSHIP" ADD CONSTRAINT "USER_ORG_FK_2" FOREIGN KEY ("BADGE_ID") REFERENCES "TOMMY"."BADGE" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
