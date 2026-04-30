import { useEffect, useState } from "react";
import {
  compareCompanies,
  getCompanyRoleDistribution,
  getCompanyTopSkills,
  getCompanyWorkModeDistribution,
  getJobs,
} from "../api";
import CompanyAnalyticsPanel from "../components/companies/CompanyAnalyticsPanel";
import CompanyComparePanel from "../components/companies/CompanyComparePanel";
import CompanySelector from "../components/companies/CompanySelector";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import {
  extractCompaniesFromJobs,
  mapCompanyRoleDistribution,
  mapCompanyTopSkills,
  mapCompanyWorkModeDistribution,
} from "../utils/companyMappers";

const EMPTY_ANALYTICS = {
  topSkills: [],
  roleDistribution: [],
  workModeDistribution: [],
};

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [analytics, setAnalytics] = useState(EMPTY_ANALYTICS);
  const [companyA, setCompanyA] = useState("");
  const [companyB, setCompanyB] = useState("");
  const [compareResult, setCompareResult] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState("");
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const [comparing, setComparing] = useState(false);
  const [compareError, setCompareError] = useState("");
  const [compareValidation, setCompareValidation] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCompanies() {
      try {
        setLoadingCompanies(true);
        setCompaniesError("");

        const response = await getJobs({ page: 0, size: 200 });
        const extractedCompanies = extractCompaniesFromJobs(response?.content);

        if (isMounted) {
          setCompanies(extractedCompanies);
        }
      } catch (apiError) {
        if (isMounted) {
          setCompaniesError(apiError?.message || "Companies could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoadingCompanies(false);
        }
      }
    }

    loadCompanies();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadCompanyAnalytics() {
      if (!selectedCompanyId) {
        setAnalytics(EMPTY_ANALYTICS);
        setAnalyticsError("");
        return;
      }

      try {
        setLoadingAnalytics(true);
        setAnalyticsError("");

        const [topSkills, roleDistribution, workModeDistribution] =
          await Promise.all([
            getCompanyTopSkills(selectedCompanyId, 10),
            getCompanyRoleDistribution(selectedCompanyId),
            getCompanyWorkModeDistribution(selectedCompanyId),
          ]);

        if (isMounted) {
          setAnalytics({
            topSkills: mapCompanyTopSkills(topSkills),
            roleDistribution: mapCompanyRoleDistribution(roleDistribution),
            workModeDistribution:
              mapCompanyWorkModeDistribution(workModeDistribution),
          });
        }
      } catch (apiError) {
        if (isMounted) {
          setAnalyticsError(
            apiError?.message || "Company analytics could not be loaded."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingAnalytics(false);
        }
      }
    }

    loadCompanyAnalytics();

    return () => {
      isMounted = false;
    };
  }, [selectedCompanyId]);

  async function handleCompare() {
    setCompareError("");
    setCompareValidation("");
    setCompareResult(null);

    if (!companyA || !companyB) {
      return;
    }

    if (companyA === companyB) {
      setCompareValidation("Please select two different companies.");
      return;
    }

    try {
      setComparing(true);
      const response = await compareCompanies(companyA, companyB);
      setCompareResult(response);
    } catch (apiError) {
      setCompareError(apiError?.message || "Companies could not be compared.");
    } finally {
      setComparing(false);
    }
  }

  if (loadingCompanies) {
    return <LoadingState message="Loading companies..." />;
  }

  if (companiesError) {
    return <ErrorState message={companiesError} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Companies
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Analyze company-level technology demand, role distribution, and work
          mode patterns.
        </p>
      </div>

      {companies.length === 0 ? (
        <EmptyState
          title="No companies found"
          message="No company identifiers were found in the latest jobs response."
        />
      ) : (
        <>
          <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-950">
                Single Company Analysis
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a company to inspect skills, roles, and work modes.
              </p>
            </div>

            <CompanySelector
              value={selectedCompanyId}
              companies={companies}
              onChange={setSelectedCompanyId}
            />
          </section>

          <CompanyAnalyticsPanel
            selectedCompanyId={selectedCompanyId}
            analytics={analytics}
            loading={loadingAnalytics}
            error={analyticsError}
          />

          <CompanyComparePanel
            companies={companies}
            companyA={companyA}
            companyB={companyB}
            onCompanyAChange={setCompanyA}
            onCompanyBChange={setCompanyB}
            onCompare={handleCompare}
            loading={comparing}
            error={compareError}
            validation={compareValidation}
            result={compareResult}
          />
        </>
      )}
    </div>
  );
}
