import { msmes as mockMsmes, type Msme, type MsmeStatus } from "@/data/msmes";
import { mockRequest, mockReject } from "./client";

export interface ListMsmesParams {
  query?: string;
  status?: MsmeStatus | "All";
  page?: number;
  pageSize?: number;
}

export interface ListMsmesResponse {
  items: Msme[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ArchiveMsmePayload {
  id: string;
  reason: string;
}

export interface UploadMsmesPayload {
  file?: File;
  records?: Partial<Msme>[];
}

export const MsmeManagementApi = {
  list(params: ListMsmesParams = {}): Promise<ListMsmesResponse> {
    const { query = "", status = "All", page = 1, pageSize = 20 } = params;
    const filtered = mockMsmes.filter((m) => {
      if (status !== "All" && m.status !== status) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.msmeId.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q)
      );
    });
    const start = (page - 1) * pageSize;
    return mockRequest({
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    });
  },

  get(id: string): Promise<Msme> {
    const found = mockMsmes.find((m) => m.id === id);
    return found
      ? mockRequest(found)
      : mockReject(`MSME ${id} not found`, 404);
  },

  update(id: string, patch: Partial<Msme>): Promise<Msme> {
    const found = mockMsmes.find((m) => m.id === id);
    if (!found) return mockReject(`MSME ${id} not found`, 404);
    return mockRequest({ ...found, ...patch });
  },

  archive({ id, reason }: ArchiveMsmePayload): Promise<Msme> {
    const found = mockMsmes.find((m) => m.id === id);
    if (!found) return mockReject(`MSME ${id} not found`, 404);
    return mockRequest({
      ...found,
      status: "Archived" as MsmeStatus,
      archiveReason: reason,
    });
  },

  restore(id: string): Promise<Msme> {
    const found = mockMsmes.find((m) => m.id === id);
    if (!found) return mockReject(`MSME ${id} not found`, 404);
    return mockRequest({
      ...found,
      status: "Active" as MsmeStatus,
      archiveReason: undefined,
    });
  },

  upload(_payload: UploadMsmesPayload): Promise<{ success: true; created: number }> {
    return mockRequest({ success: true as const, created: 1 });
  },

  exportData(): Promise<{ url: string }> {
    return mockRequest({ url: "data:text/csv;base64,aWQsbmFtZQo=" });
  },
};
