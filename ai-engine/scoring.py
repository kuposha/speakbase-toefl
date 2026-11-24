import re

_WORDS = re.compile(r"[a-z]+(?:'[a-z]+)?", re.I)


def tokens(text: str) -> list[str]:
    return [word.lower() for word in _WORDS.findall(text or "")]


def edit_distance(left: list[str], right: list[str]) -> int:
    previous = list(range(len(right) + 1))
    for i, word in enumerate(left, 1):
        current = [i]
        for j, other in enumerate(right, 1):
            current.append(min(
                current[-1] + 1,
                previous[j] + 1,
                previous[j - 1] + (word != other),
            ))
        previous = current
    return previous[-1]


def word_error_rate(reference: str, hypothesis: str) -> float:
    expected, heard = tokens(reference), tokens(hypothesis)
    if not expected:
        return 0.0 if not heard else 1.0
    return edit_distance(expected, heard) / len(expected)


def as_percent(value) -> float | None:
    if value is None:
        return None
    number = float(value)
    if 0 <= number <= 1:
        number *= 100
    return max(0.0, min(100.0, number))


def repeat_practice_estimate(reference: str, hypothesis: str, pronunciation_accuracy):
    error_rate = word_error_rate(reference, hypothesis)
    exactness = max(0.0, 1.0 - error_rate)
    pronunciation = as_percent(pronunciation_accuracy)
    if pronunciation is None:
        pronunciation = exactness * 100
    score = round(5 * (0.65 * exactness + 0.35 * pronunciation / 100))
    return {
        "practice_estimate": max(0, min(5, score)),
        "exactness_percent": round(exactness * 100),
        "word_error_rate": round(error_rate, 3),
        "pronunciation_accuracy": round(pronunciation),
    }
