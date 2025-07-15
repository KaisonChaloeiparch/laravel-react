<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::query();

        if ($request->department) {
            $query->where('department', $request->department);
        }

        if ($request->position) {
            $query->where('position', 'like', '%' . $request->position . '%');
        }

        return Inertia::render('Employees/Index', [
            'employees' => $query->get(),
            'filters' => $request->only(['department', 'position']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'salary' => 'required|numeric',
            'department' => 'required',
            'profile_photo' => 'nullable|image|max:2048',
        ]);

        $path = $request->file('profile_photo')?->store('profiles', 'public');

        Employee::create([
            'name' => $request->name,
            'position' => $request->position,
            'salary' => $request->salary,
            'department' => $request->department,
            'profile_photo' => $path,
        ]);

        return redirect()->route('employees.index');
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'salary' => 'required|numeric',
            'department' => 'required',
            'profile_photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_photo')) {
            if ($employee->profile_photo) {
                Storage::disk('public')->delete($employee->profile_photo);
            }
            $employee->profile_photo = $request->file('profile_photo')->store('profiles', 'public');
        }

        $employee->update($request->only(['name', 'position', 'salary', 'department', 'profile_photo']));

        return redirect()->route('employees.index');
    }

    public function destroy(Employee $employee)
    {
        if ($employee->profile_photo) {
            Storage::disk('public')->delete($employee->profile_photo);
        }

        $employee->delete();
        return redirect()->route('employees.index');
    }
}
