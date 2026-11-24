import unittest

from scoring import repeat_practice_estimate, word_error_rate


class ScoringTests(unittest.TestCase):
    def test_exact_repeat(self):
        result = repeat_practice_estimate('The quick brown fox', 'The quick brown fox', 96)
        self.assertEqual(result['exactness_percent'], 100)
        self.assertEqual(result['practice_estimate'], 5)

    def test_word_error_rate(self):
        self.assertEqual(word_error_rate('one two three', 'one two three'), 0)
        self.assertAlmostEqual(word_error_rate('one two three', 'one four three'), 1 / 3)

    def test_low_accuracy_cannot_receive_high_estimate(self):
        result = repeat_practice_estimate('one two three four', 'one', 20)
        self.assertLessEqual(result['practice_estimate'], 2)


if __name__ == '__main__':
    unittest.main()
