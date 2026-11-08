# Calculatrice (Calculator)

A scientific calculator: type your calculation on the keyboard or click the keys, the result appears as you type, and each calculation stays in the history to be reused.

*Version française : [README.md](README.md)*

## How to use it

- Type a whole expression, for example `2(3+4)^2 ÷ 5` or `sin(30) + √16`. The provisional result ("= …") shows live under the input.
- **Enter** or **=** calculates: the result replaces the expression and joins the history.
- **Escape** or **C** clears the input, **⌫** removes the last character.
- The on-screen keys insert their symbol where the cursor is.

## What it understands

- The four operations (`+ − × ÷`, or `* /` on the keyboard), parentheses and the usual precedence.
- Powers with `^` (x² and xʸ on the keys); they are evaluated right to left: `2^3^2` is 512.
- `n!` (factorial, up to 170) and `%` (`50%` is 0.5).
- The functions `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `ln` (natural log), `log` (base 10), `√` or `sqrt`, `abs`, `exp`, `round`, `floor`, `ceil`.
- The constants `π` (or `pi`) and `e`, and **Ans**, the last result.
- Implicit multiplication: `2π`, `3(4+1)`, `2sin(30)`.
- The comma as decimal separator (`1,5`), and the dot too.
- **DEG/RAD** switches angles between degrees and radians; the active mode is shown.

Errors are stated plainly: incomplete expression, division by zero, impossible factorial, unexpected character. Very large and very small numbers are shown in scientific notation, with at most 14 significant digits. Results use a decimal comma.

## History

The last 50 calculations appear on the right, like a receipt. **Click a result** to put it back into the input; **Clear** empties the history.

## Data and sync

The history is kept in the plugin's folder and backed up by NeoDex, but it is not synced: each PC keeps its own.

## Install

In NeoDex: **NeoStore → Discover → Calculatrice → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
