# Calculatrice (Calculator)

A scientific calculator: type your calculation on the keyboard or click the keys, the result appears as you type, and each calculation stays in the history to be reused.

*Version française : [README.md](README.md)*

## In plain words, with units (new in 1.4.0)

20 % of 85 € + 12 €, 3 days in hours, 100 km / 2 h, variables: the calculator understands sentences and units.

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

## In plain words, with units (1.4.0)

Type the way you speak (in French or English keywords):

- **Percentages**: `20 % de 85 €` or `20 % of 85 €` (17 €), `85 € + 20 %` (102 €), `12 € - 10 %` (10.8 €).
- **Units**: lengths (m, km, cm, mile, foot, inch), areas, volumes (L, cl, ml), masses (g, kg, t, pound, ounce), durations (s, min, h, day, week, month, year), speeds (km/h, m/s, mph), data (B, kB, MB, GB, TB), temperatures (°C, °F, K) and currencies (€, $, £, ¥, CHF, without exchange rates). `2 h 30 min` adds up by itself, `100 km / 2 h` gives 50 km/h, `60 km/h * 2 h` gives 120 km.
- **Conversions** with “en”, “in”, “to” or “→”: `3 days in hours` (72 h), `20 °C to °F` (68 °F), `1 GB in MB`.
- **Words**: plus, minus, times, divided by.
- **Variables**: `price = 40 €`, then `price * 3 - 10 %`. They stay at the top of the receipt.

Adding two units that do not match (metres and kilos) shows “incompatible units”.

## History

The last 50 calculations appear on the right, like a receipt. **Click a result** to put it back into the input; **Clear** empties the history.

## Data and sync

The history is kept in the plugin's folder and backed up by NeoDex, but it is not synced: each PC keeps its own.

## Install

In NeoDex: **NeoStore → Discover → Calculatrice → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## Version 1.3.0

- The calculator grows with the window: keys, screen and history get bigger (46 px keys in a small window, up to almost 80 px full screen).
- The degrees / radians key is now "D/R" (tooltip on hover), so it fits in its key.
