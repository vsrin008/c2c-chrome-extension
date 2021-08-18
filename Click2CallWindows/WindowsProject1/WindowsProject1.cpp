// WindowsProject1.cpp : Defines the entry point for the application.
//

#include "framework.h"
#include "WindowsProject1.h"
#include <windows.h>
#include <stdio.h>
#include <shellapi.h>
#include "tapi.h"
#include <string>
using namespace std;

#define MAX_LOADSTRING 100

// Global Variables:
HINSTANCE hInst;                                // current instance
WCHAR szTitle[MAX_LOADSTRING];                  // The title bar text
WCHAR szWindowClass[MAX_LOADSTRING];            // the main window class name

// Forward declarations of functions included in this code module:
ATOM                MyRegisterClass(HINSTANCE hInstance);
BOOL                InitInstance(HINSTANCE, int);
LRESULT CALLBACK    WndProc(HWND, UINT, WPARAM, LPARAM);
INT_PTR CALLBACK    About(HWND, UINT, WPARAM, LPARAM);

void strwipe(_TCHAR*, _TCHAR*);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                     _In_opt_ HINSTANCE hPrevInstance,
                     _In_ LPWSTR    lpCmdLine,
                     _In_ int       nCmdShow)
{
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);

    // TODO: Place code here.
    int argc;
    LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);

    

    LPWSTR number = argv[1];

    _wcsupr_s(number, wcslen(number) + 1);

    // - overwrite unwanted substrings with spaces
    strwipe(number, (_TCHAR*)L"CALLTO:");
    strwipe(number, (_TCHAR*)L"SIP:");
    strwipe(number, (_TCHAR*)L"/");

    // - convert %xx codes to characters (xx = char number in hex)
    _TCHAR* p1 = wcsstr(number, L"%");
    _TCHAR* lastPos = p1 + wcslen(number) - 3;	// Last position at which we analyse a found %

    while (p1 != NULL && p1 <= lastPos)
    {
        // Hex digits -> values
        int d1 = *(p1 + 1) - '0';
        if (d1 > 9)
            d1 -= 7;

        int d0 = *(p1 + 2) - '0';
        if (d0 > 9)
            d0 -= 7;

        // Values -> character
        _TCHAR convertedChar = 0;

        if (d1 >= 0 && d1 <= 15
            && d0 >= 0 && d0 <= 15)
            convertedChar = (16 * d1) + d0;

        // If value > 0 then overwrite %xx with char & spaces
        if (convertedChar > 0)
        {
            *(p1++) = convertedChar;
            *(p1++) = ' ';
            *(p1++) = ' ';
        }

        // - look for another %xx
        p1 = wcsstr(p1, L"%");
    }

    // - remove spaces
    p1 = number;
    _TCHAR* p2 = p1;

    do
    {
        if (*p2 != ' ')
            *(p1++) = *p2;
    } while (*(p2++) != '\0');


    /*MessageBoxW(0, number, TEXT("argv"), MB_OK);*/

    tapiRequestMakeCall(number, (LPCWSTR)L"Dial.exe", (LPCWSTR)L"Click2Call", (LPCWSTR)L"Click2Call");


    // Initialize global strings
    LoadStringW(hInstance, IDS_APP_TITLE, szTitle, MAX_LOADSTRING);
    LoadStringW(hInstance, IDC_WINDOWSPROJECT1, szWindowClass, MAX_LOADSTRING);
    MyRegisterClass(hInstance);

}



//
//  FUNCTION: MyRegisterClass()
//
//  PURPOSE: Registers the window class.
//
ATOM MyRegisterClass(HINSTANCE hInstance)
{
    WNDCLASSEXW wcex;

    wcex.cbSize = sizeof(WNDCLASSEX);

    wcex.style          = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc    = WndProc;
    wcex.cbClsExtra     = 0;
    wcex.cbWndExtra     = 0;
    wcex.hInstance      = hInstance;
    wcex.hIcon          = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_WINDOWSPROJECT1));
    wcex.hCursor        = LoadCursor(nullptr, IDC_ARROW); 
    wcex.hbrBackground  = (HBRUSH)(COLOR_WINDOW+1);
    wcex.lpszMenuName   = MAKEINTRESOURCEW(IDC_WINDOWSPROJECT1);
    wcex.lpszClassName  = szWindowClass;
    wcex.hIconSm        = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

    return RegisterClassExW(&wcex);
}


//
//  FUNCTION: WndProc(HWND, UINT, WPARAM, LPARAM)
//
//  PURPOSE: Processes messages for the main window.
//
//  WM_COMMAND  - process the application menu
//  WM_PAINT    - Paint the main window
//  WM_DESTROY  - post a quit message and return
//
//
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_COMMAND:
        {
            int wmId = LOWORD(wParam);
            // Parse the menu selections:
            switch (wmId)
            {
            case IDM_ABOUT:
                DialogBox(hInst, MAKEINTRESOURCE(IDD_ABOUTBOX), hWnd, About);
                break;
            case IDM_EXIT:
                DestroyWindow(hWnd);
                break;
            default:
                return DefWindowProc(hWnd, message, wParam, lParam);
            }
        }
        break;
    case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hWnd, &ps);
            // TODO: Add any drawing code that uses hdc here...
            EndPaint(hWnd, &ps);
        }
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProc(hWnd, message, wParam, lParam);
    }
    return 0;
}

// Message handler for about box.
INT_PTR CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
    UNREFERENCED_PARAMETER(lParam);
    switch (message)
    {
    case WM_INITDIALOG:
        return (INT_PTR)TRUE;

    case WM_COMMAND:
        if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL)
        {
            EndDialog(hDlg, LOWORD(wParam));
            return (INT_PTR)TRUE;
        }
        break;
    }
    return (INT_PTR)FALSE;
}

void strwipe(_TCHAR* inString, _TCHAR* wipeThis)
{
    if (wcslen(inString) > 0 && wcslen(wipeThis) > 0)	// Do not process empty strings
    {
        TCHAR* p1 = NULL;	// Pointer to found sub-string
        do
        {
            p1 = wcsstr(inString, wipeThis);
            if (p1 != NULL)
            {
                TCHAR* p2 = p1 + wcslen(wipeThis);	// end point for overwrite
                while (p1 < p2)
                    *(p1++) = ' ';
            }
        } while (p1 != NULL);
    }
}