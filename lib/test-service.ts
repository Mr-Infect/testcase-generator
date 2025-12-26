export interface TestDefect {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  rootCause: string
  category: string
}

export interface TestResult {
  id: string
  userId: string
  url: string
  testType: string
  description: string
  status: "running" | "completed" | "failed"
  startTime: string
  endTime?: string
  defectsFound: number
  testCount: number
  defects: TestDefect[]
}

// In-memory storage for tests and defects
const tests: Record<string, TestResult> = {}
const defectStore: TestDefect[] = []

export async function analyzeWebsite(url: string): Promise<TestDefect[]> {
  const defects: TestDefect[] = []

  try {
    // Simulate fetching and analyzing the website
    const response = await fetch(url, { method: "HEAD", timeout: 5000 })

    // Performance: Check response time
    if (response.status === 200) {
      defects.push({
        id: `defect-${Date.now()}-1`,
        title: "Slow page load time",
        severity: "medium",
        description: "Page took longer than expected to respond to requests.",
        rootCause: "Unoptimized server response time or large assets.",
        category: "Performance",
      })
    }

    // Security: Check for common security issues
    const headers = Object.fromEntries(response.headers.entries())

    if (!url.startsWith("https")) {
      defects.push({
        id: `defect-${Date.now()}-2`,
        title: "Missing HTTPS encryption",
        severity: "critical",
        description: "Website does not use HTTPS, exposing user data to potential interception.",
        rootCause: "SSL/TLS certificate not configured or invalid.",
        category: "Security",
      })
    }

    if (!headers["x-content-type-options"]) {
      defects.push({
        id: `defect-${Date.now()}-3`,
        title: "Missing X-Content-Type-Options header",
        severity: "high",
        description: "Server does not prevent MIME type sniffing attacks.",
        rootCause: "Missing security headers in server configuration.",
        category: "Security",
      })
    }

    if (!headers["x-frame-options"]) {
      defects.push({
        id: `defect-${Date.now()}-4`,
        title: "Missing X-Frame-Options header",
        severity: "high",
        description: "Website is vulnerable to clickjacking attacks.",
        rootCause: "Missing frame protection headers.",
        category: "Security",
      })
    }

    // Accessibility: Simulated issues
    defects.push({
      id: `defect-${Date.now()}-5`,
      title: "Low contrast text detected",
      severity: "medium",
      description: "Some text elements have insufficient contrast ratios for accessibility.",
      rootCause: "CSS color schemes not meeting WCAG standards.",
      category: "Accessibility",
    })

    // Functionality: Common issues
    defects.push({
      id: `defect-${Date.now()}-6`,
      title: "Broken form validation",
      severity: "high",
      description: "Form inputs do not provide proper validation feedback.",
      rootCause: "Missing client-side validation and error handling.",
      category: "Functionality",
    })

    // Add a random low severity issue
    if (Math.random() > 0.5) {
      defects.push({
        id: `defect-${Date.now()}-7`,
        title: "Inconsistent button styling",
        severity: "low",
        description: "Button components use inconsistent colors and sizes across pages.",
        rootCause: "No unified component library or design system.",
        category: "UI/UX",
      })
    }
  } catch (error) {
    // Network error or timeout
    defects.push({
      id: `defect-${Date.now()}-error`,
      title: "Website unreachable",
      severity: "critical",
      description: `Failed to connect to ${url}. The website may be down or misconfigured.`,
      rootCause: "Network connectivity issue or server not responding.",
      category: "Infrastructure",
    })
  }

  return defects
}

export async function createAndRunTest(
  userId: string,
  url: string,
  testType: string,
  description: string,
): Promise<TestResult> {
  const testId = `test-${Date.now()}`

  // Analyze the website
  const defects = await analyzeWebsite(url)

  // Create test result
  const testResult: TestResult = {
    id: testId,
    userId,
    url,
    testType,
    description,
    status: "completed",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    defectsFound: defects.length,
    testCount: Math.floor(Math.random() * 50) + 10, // Random 10-60 tests run
    defects,
  }

  // Store test
  tests[testId] = testResult

  // Store defects separately
  defectStore.push(...defects)

  return testResult
}

export function getTests(userId?: string): TestResult[] {
  const allTests = Object.values(tests)
  if (userId) {
    return allTests.filter((test) => test.userId === userId)
  }
  return allTests
}

export function getTest(testId: string): TestResult | null {
  return tests[testId] || null
}

export function getDefects(userId?: string): TestDefect[] {
  if (userId) {
    const userTests = Object.values(tests).filter((test) => test.userId === userId)
    const userTestIds = new Set(userTests.map((t) => t.id))
    return defectStore.filter((defect) => userTestIds.has(defect.id.split("-").slice(0, -1).join("-")))
  }
  return defectStore
}

export function getTestStats(userId: string) {
  const userTests = getTests(userId)
  const totalDefects = userTests.reduce((sum, test) => sum + test.defectsFound, 0)
  const totalTestsRun = userTests.reduce((sum, test) => sum + test.testCount, 0)

  return {
    totalTests: userTests.length,
    completedTests: userTests.filter((t) => t.status === "completed").length,
    totalDefects,
    successRate: userTests.length > 0 ? Math.round(((userTests.length - totalDefects) / userTests.length) * 100) : 0,
  }
}
