import matplotlib.pyplot as plt
import numpy as np

n = 500
k = 50

p = n / k
arr = [p for i in range(k)]
for i in range(k):
	# print(arr)
	for j in range(k - i - 1):
		tmp = arr[i] / 3 / (k)
		arr[-(j + 1)] += tmp
		arr[i] -= tmp


# print(arr)
# print(sum(arr))
x = np.arange(k)
plt.bar(x, arr)
plt.show()