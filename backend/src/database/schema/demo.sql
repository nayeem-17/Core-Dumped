SET SERVEROUTPUT ON;
DECLARE
    E_NAME EMPLOYEES.SALARY%type;
BEGIN 
    SELECT SALARY INTO E_NAME FROM EMPLOYEES WHERE EMPLOYEE_ID=100;
    DBMS_OUTPUT.PUT_LINE("A"  => E_NAME /*IN VARCHAR2*/);
END;
/
DECLARE 
    J_DATE DATE;
    YEARS NUMBER;
    E_SALARY EMPLOYEES.EMPLOYEE_ID%TYPE;
BEGIN
    SELECT HIRE_DATE, SALARY INTO J_DATE, E_SALARY
    FROM EMPLOYEES
    WHERE EMPLOYEE_ID=100;
    YEARS:= (MONTHS_BETWEEN(SYSDATE() ,
                            J_DATE))/12;
    IF YEARS >=10 THEN
        DBMS_OUTPUT.PUT_LINE('THIS EMPLOYEE IS MENTALLY DED!!!  INCREASE HIS SALARY PLEAS' /*IN VARCHAR2*/);
    ELSE
        DBMS_OUTPUT.PUT_LINE('THIS SON OF A BITCH IS STILL ALIVE' /*IN VARCHAR2*/);
    END IF;
    
    IF E_SALARY <= 1000 AND E_SALARY > 2000 THEN
        DBMS_OUTPUT.PUT_LINE('salary not good. its c') ;
    ELSIF E_SALARY <= 2000 AND E_SALARY >= 3000 THEN
        DBMS_OUTPUT.PUT_LINE('salary litol good. its b') ;
    ELSIF E_SALARY >=3000 THEN
        DBMS_OUTPUT.PUT_LINE('SALARY GOOD!!!!');
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE("A"  => 'No data found' /*IN VARCHAR2*/);
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.put_line('too many rows!!!');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE("A"  => 'idk what happened' /*IN VARCHAR2*/);
END;
/
DECLARE 
    var_1 NUMBER;
    var_2 NUMBER;
BEGIN
    var_1:=10;
    var_2:=33;
    FOR i in var_1..var_2
    LOOP
         DBMS_OUTPUT.PUT_LINE(i);
    END LOOP;
END;
/

DECLARE
    years number;
    counter number;
    old_sal NUMBER;
    new_sal NUMBER;
BEGIN
    counter:=0;
    for r in (SELECT EMPLOYEE_ID,SALARY,HIRE_DATE FROM EMPLOYEES)
    LOOP
        old_sal:= r.SALARY;
        years:=(MONTHS_BETWEEN(SYSDATE(),r.HIRE_DATE)/12);
        if years>=10 THEN 
            COUNTER:=counter+1;
            UPDATE EMPLOYEES SET SALARY = SALARY*1.5 WHERE EMPLOYEE_ID= r.EMPLOYEE_ID;
        END IF;
        SELECT SALARY INTO new_sal from EMPLOYEES WHERE EMPLOYEE_ID= r.EMPLOYEE_ID;
        DBMS_OUTPUT.PUT_LINE('old_sal -> '|| old_sal || ' new sal -> '|| new_sal);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('total number of employees over 10 years -> '|| COUNTER);
END;
/

CREATE or REPLACE PROCEDURE is_senior_employee(
    EID IN VARCHAR2
) IS
    j_date date;
    years NUMBER;
    E_SALARY EMPLOYEES.EMPLOYEE_ID%TYPE;
BEGIN
    SELECT HIRE_DATE INTO J_DATE
    FROM EMPLOYEES
    WHERE EMPLOYEE_ID=EID;
    YEARS:= (MONTHS_BETWEEN(SYSDATE() ,
                            J_DATE))/12;
    IF YEARS >=10 THEN
        DBMS_OUTPUT.PUT_LINE('THIS EMPLOYEE IS MENTALLY DED!!!  INCREASE HIS SALARY PLEAS' /*IN VARCHAR2*/);
    ELSE
        DBMS_OUTPUT.PUT_LINE('THIS SON OF A BITCH IS STILL ALIVE' /*IN VARCHAR2*/);
    END IF;

END;

exec IS_SENIOR_EMPLOYEE(105);

DECLARE
BEGIN
    IS_SENIOR_EMPLOYEE;
END;


notification table
    field:
        profile_id
        type
        link
        message
        is_read
        created_at
        updated_at

INSERT INTO QUESTION_REACT(
    question_id,
    REACT,
    REACTED_BY
  )
VALUES
  (
    21,
    'y',
    77
  );

UPDATE ARTICLE_REACT
SET
    REACT = 'n'
WHERE
    QUESTION_ID = 21
    AND REACTED_BY = 77;

INSERT INTO 
    ARTICLE_REACTION(
        ARTICLE_ID,
        REACTED_BY,
        REACT
    ) 
    VALUES(
        :articleId,
        :userId,
        :reaction);

SELECT ID,REPUTATION FROM PROFILE;

SET SERVEROUTPUT ON;
DECLARE
BEGIN
    UPDATE QUESTION_REACT
    SET
        REACT = 'N'
    WHERE
        QUESTION_ID = 21
        AND REACTED_BY = 89;
END;


SELECT * FROM QUESTION_REACT;
UPDATE QUESTION_REACT
SET
    REACT = UPPER(REACT)
WHERE ID IN(
    SELECT ID FROM QUESTION_REACT
);
SELECT * FROM QUESTION_REACT;
SELECT UPPER(REACT) VOTE,COUNT(*) VOTE_COUNT FROM QUESTION_REACT GROUP BY REACT;
UPDATE ARTICLE_REACT
SET
    REACT = UPPER(REACT)
WHERE ID IN(
    SELECT ID FROM ARTICLE_REACT
);




INSERT INTO QUESTION_TAG(
    ID,
    QUESTION_ID,
    TAG_ID
  )
VALUES
  (
162, 65    
  );
SELECT T.ID,T.TITLE,T.DESCRIPTION
                    FROM TAG T
                    WHERE LOWER(T.TITLE) 
                    LIKE '%'||LOWER(REPLACE('',' ','%'))||'%'
                     ORDER BY COUNT(
                    SELECT 
                        COUNT(*) 
                    FROM 
                        QUESTION_TAG QT 
                    WHERE 
                        QT.TAG_ID = T.ID
                    ) DESC  
            FETCH FIRST 15 ROWS ONLY;