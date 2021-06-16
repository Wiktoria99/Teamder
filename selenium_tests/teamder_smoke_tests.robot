*** Settings ***
Library  SeleniumLibrary
Library  OperatingSystem
Suite Setup     Test Suite Setup
Suite Teardown  Test Suite Teardown
Default Tags    smoke

*** Keywords ***
Test Suite Setup
    Remove file                 screenshots/selenium-screenshot-*
    Set Environment Variable    PATH  C:\\ChromeDriver
    Set Screenshot Directory    screenshots
    ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method    ${options}    add_argument      disable-web-security
    Call Method    ${options}    add_argument      allow-running-insecure-content
    Open Browser                browser=chrome      options=${options}
    Maximize Browser Window

Test Suite Teardown
    Close Browser

Input Data
    [Arguments]     ${input_name}       ${input_data}
    Input Text      //div//label[contains(text(),"${input_name}")]/following-sibling::div/input     ${input_data}    clear=True

Input Data To Textarea
    [Arguments]     ${input_name}       ${input_data}
    Input Text      //div//label[contains(text(),"${input_name}")]/following-sibling::div/textarea     ${input_data}    clear=True

Select Interest
    [Arguments]     ${interest_name}
    Click Element   //span[contains(text(), "${interest_name}")]/parent::div/preceding-sibling::div//span//input

*** Variables ***
${PAGE_URL}  http://127.0.0.1:3000

*** Test Cases ***
User Can See Login And Register Panel
    Go to   ${PAGE_URL}
    Wait Until Page Contains    Logowanie
    Click Element               //span[contains(text(), "Zarejestruj się!")]
    Wait Until Page Contains    Podstawowe informacje
    Click Element               //span[contains(text(), "logowania")]

User Can Login
    Input Text                  //input[contains(@type,"text")]         mcwerz
    Input Text                  //input[contains(@type,"password")]     haslo1
    Click Element               //span[contains(text(), "Zaloguj")]

User Can Go Through Main Tabs
    Wait Until Page Contains    Witaj!
    Click Element               //span[contains(text(), "Strona główna")]
    Wait Until Page Contains    Zespoły
    Click Element               //span[contains(text(), "Moje zespoły")]
    Wait Until Page Contains    Moje zespoły
    Click Element               //span[contains(text(), "Powiadomienia")]
    Wait Until Page Contains    Powiadomienia
    Click Element               //span[contains(text(), "Profil")]
    Wait Until Page Contains    Mój profil

User Can Create Team
    Click Element               //span[contains(text(), "Stwórz zespół")]
    Wait Until Page Contains    Tworzenie zespołu
    Select Interest  taniec
    Input Data  Nazwa zespołu   Dzikie plonsy na rejonie
    Input Data  Data i czas     10072021\t2137
    Input Data  Lokalizacja     Krakow rejon
    Input Data To Textarea      Cena za osobę   1
    Input Data To Textarea      Opis            Tańce i hulanki
    Input Data  Ilość miejsc    40
    Click Element               //span[text()="Stwórz"]
    Click Element               //span[contains(text(), "Moje zespoły")]
    Wait Until Page Contains    Moje zespoły
    Sleep   3
    Page Should Contain         Dzikie plonsy na rejonie

User Can Join Team
    Click Element               //span[contains(text(), "Strona główna")]
    Wait Until Page Contains    Zespoły
    Sleep   3
    Click Element               //span[contains(text(), "Więcej")]
    Wait Until Page Contains    Zespół


User Can View Teams By Category
    Click Element               //table//tr[1]//a
    Wait Until Page Contains Element    //h3[contains(text(), "podróże")]