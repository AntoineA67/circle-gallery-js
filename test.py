import matplotlib.pyplot as plt
import numpy as np

n = 50
k = 3

p = n / k
arr = [p for i in range(k)]
for i in range(k):
	print(arr)
	for j in range(k - i - 1):
		tmp = arr[i] / 3 / (k * 1)
		arr[-(j + 1)] += tmp
		arr[i] -= tmp


print(arr)
print(sum(arr))
x = np.arange(k)
plt.plot(x, arr)
plt.show()